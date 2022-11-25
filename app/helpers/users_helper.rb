module UsersHelper
  CONFIRMATION_PATH = Rails.configuration.frontend_base_url + 'confirmation/'

  def custom_confirmation_path(resource, confirmation_token: nil)
    if resource.class == User
      return custom_path(confirmation_token: confirmation_token)
    end
    confirmation_url(resource, confirmation_token: confirmation_token)
  end

  private

  def custom_path(confirmation_token: nil)
    return CONFIRMATION_PATH + confirmation_token
  end
end
