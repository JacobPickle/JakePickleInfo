# frozen_string_literal: true

# Change these
server '143.198.145.223', port: 22, roles: %i[web app db], primary: true

set :repo_url, 'git@github.com:JacobPickle/JakePickleInfo.git'
set :branch, ENV['BRANCH'] if ENV['BRANCH']
set :application,     'JakePickleInfo'
set :user,            'deploy'
set :puma_threads,    [4, 16]
set :puma_workers,    0
set :linked_files, %w[config/master.key]

# Don't change these unless you know what you're doing
set :pty,             true
set :use_sudo,        false
set :stage,           :production
set :rails_env,       'production'
set :deploy_via,      :remote_cache
set :deploy_to,       "/home/#{fetch(:user)}/apps/#{fetch(:application)}"
set :puma_bind,       'unix:///home/deploy/apps/JakePickleInfo/shared/tmp/sockets/puma.sock'
set :puma_state,      '/home/deploy/apps/JakePickleInfo/shared/tmp/pids/puma.state'
set :puma_pid,        '/home/deploy/apps/JakePickleInfo/shared/tmp/pids/puma.pid'
set :puma_access_log, '/home/deploy/apps/JakePickleInfo/current/log/puma.access.log'
set :puma_error_log,  '/home/deploy/apps/JakePickleInfo/current/log/puma.error.log'
set :ssh_options,     { forward_agent: true, user: fetch(:user), keys: %w[~/.ssh/id_rsa.pub] }
set :puma_preload_app, true
set :puma_worker_timeout, nil
set :puma_init_active_record, true # Change to false when not using ActiveRecord

## Defaults:
# set :scm,           :git
# set :branch,        :master
# set :format,        :pretty
# set :log_level,     :debug
# set :keep_releases, 5

## Linked Files & Directories (Default None):
# set :linked_files, %w{config/database.yml}
# set :linked_dirs,  %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

namespace :puma do
  desc 'Create Directories for Puma Pids and Socket'
  task :make_dirs do
    on roles(:app) do
      execute "mkdir #{shared_path}/tmp/sockets -p"
      execute "mkdir #{shared_path}/tmp/pids -p"
    end
  end

  before :start, :make_dirs
end

namespace :deploy do
  desc 'Make sure local git is in sync with remote.'
  task :check_revision do
    on roles(:app) do
      unless `git rev-parse HEAD` == `git rev-parse origin/main`
        puts 'WARNING: HEAD is not the same as origin/main'
        puts 'Run `git push` to sync changes.'
        exit
      end
    end
  end

  desc 'Initial Deploy'
  task :initial do
    on roles(:app) do
      before 'deploy:restart', 'puma:start'
      invoke 'deploy'
    end
  end

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      invoke 'puma:restart'
    end
  end

  before :starting,     :check_revision
  after  :finishing,    :compile_assets
  after  :finishing,    :cleanup
  after  :finishing,    :restart
end

# ps aux | grep puma    # Get puma pid
# kill -s SIGUSR2 pid   # Restart puma
# kill -s SIGTERM pid   # Stop puma
