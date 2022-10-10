class Auth::PasswordsController < DeviseTokenAuth::PasswordsController
  def update
    # make sure user is authorized
    if require_client_password_reset_token? && resource_params[:reset_password_token]
      @resource = resource_class.with_reset_password_token(resource_params[:reset_password_token])
      return render_update_error_unauthorized unless @resource

      @token = @resource.create_token
    else
      @resource = set_user_by_token
    end

    return render_update_error_unauthorized unless @resource

    # make sure account doesn't use oauth2 provider
    unless @resource.provider == 'email'
      return render_update_error_password_not_required
    end

    # ensure reset_password_token exists to prevent double tapping
    # or using a stale link
    return render_token_failed unless password_resettable?

    # ensure that password params were sent
    unless password_resource_params[:password] && password_resource_params[:password_confirmation]
      return render_update_error_missing_password
    end

    if @resource.send(resource_update_method, password_resource_params)
      @resource.allow_password_change = false if recoverable_enabled?
      @resource.save!

      yield @resource if block_given?
      return render_update_success
    else
      return render_update_error
    end
  end

  protected

  def password_resettable?
    return false unless @resource.reset_password_token || @resource.allow_password_change || !expired_email?
    return true
  end

  def expired_email?
    return true if !@resource.reset_password_sent_at

    time_of_expired_email = @resource.reset_password_sent_at + 3.hours
    if Time.now.to_date < time_of_expired_email.to_date
      return true
    end
    return false
  end

  def render_edit_error
    redirect_to "/index"
  end

  def render_token_failed
    render_error(401, 'Token has expired. Please request another password reset')
  end
end
