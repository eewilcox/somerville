require 'vcr'

VCR.configure do |c|
  c.cassette_library_dir = "spec/vcr_cassettes"
  c.hook_into :webmock
  c.ignore_localhost = true
  c.configure_rspec_metadata!
  c.default_cassette_options = { record: :new_episodes }
  c.allow_http_connections_when_no_cassette = false
  c.filter_sensitive_data('<API_KEY>') { ENV["API_KEY"] }
  c.filter_sensitive_data('<MAP>') { ENV["MAP"] }
end
