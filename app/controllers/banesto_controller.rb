class BanestoController < ApplicationController

  before_filter :protect_payment_accepted

  skip_before_filter :verify_authenticity_token

  def payment_accepted
    campaign = Campaign.find_by_slug(params[:id])
    banesto_rate = 0.028
    amount = params[:amount] - (params[:amount] * banesto_rate)
    iva = 0.21
    amount = amount - (amount * iva)
    campaign.credit += amount / FaxForRails::TAX
    campaign.informed_low_credit = false
    campaign.save

    render :nothing => true
  end

  protected

  def protect_payment_accepted
    ips = ['94.23.203.58']
    unless ips.include? request.remote_ip
      # Check for your subnet stuff here, for example
      # if not request.remote_ip.include?('127.0,0')
      render :text => "You are unauthorized"

      return
    end
  end
end
