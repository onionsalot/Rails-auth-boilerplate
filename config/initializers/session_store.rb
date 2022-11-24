if Rails.env === 'production' 
  Rails.application.config.session_store :cookie_store, key: '_authentication_app', domain: 'authentication_app-json-api', expire_after: 1.minutes
else
  Rails.application.config.session_store :cookie_store, key: '_authentication_app', expire_after: 5.minutes
end