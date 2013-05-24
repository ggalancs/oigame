def csv_ovh_rates
  resp = HTTParty.get('https://www.ovh.co.uk/cgi-bin/telephony/callRateCsv.cgi')
  file = File.new('/tmp/ovh_fax_rates.csv', 'w')
  file.puts resp.body
  file.close
end

def import_csv
  require 'csv'    
  csv_text = File.read('/tmp/ovh_fax_rates.csv')
  csv = CSV.parse(csv_text, :headers => true)
  data = []
  csv.each do |row|
    r = row.to_s.split(';')
    r.delete_at(0)
    typ = r.delete_at(0)
    if typ == 'fixe'
      # limpieza
      r[0].gsub!(/-\d/, '')
      r[1].strip!

      data << r 
    end
  end

  return data
end

def destroy_and_create
  Rate.all(&:destroy)
  csv_ovh_rates
  data = import_csv
  data.each do |d|
    rate = Rate.create!(:country => d[0], :rate => d[1])
    puts "#{rate.country}: #{rate.rate}"
  end
end

namespace :oigame do
  desc 'Import OVH telephony and fax rates'
  task(:rates => :environment) do
    destroy_and_create if ENV['FORMAT'] == 'csv'
    puts "PRUEBA CONSEGUIDA!"
  end
end
