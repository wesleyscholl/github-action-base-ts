pipeline {
    agent any
    tools {
        nodejs 'node23'
    }
    stages {
        stage('Install') {
            steps {
                script {
                    echo "Git URL: ${env.GIT_URL}"
                    echo "Branch: ${env.GIT_BRANCH}"
                    echo "Commit: ${env.GIT_COMMIT}"
                    echo "Previous Commit: ${env.GIT_PREVIOUS_COMMIT}"
                    echo "Build Number: ${env.BUILD_NUMBER}"
                    echo "Build ID: ${env.BUILD_ID}"
                    echo "Build URL: ${env.BUILD_URL}"
                    echo "Workspace: ${env.JOB_URL}"
                    echo "Node: ${env.NODE_NAME}"
                    echo "EXECUTOR_NUMBER: ${env.EXECUTOR_NUMBER}"
                    echo "--------------------------------------------------"
                    echo "--------------------------------------------------"
                    echo "Installing Dependencies..."
                    sh 'npm install --loglevel verbose'
                }
            }
        }
        stage('Lint') {
            steps {
                script {
                    sh 'echo "Linting..."'
                    sh 'npm install -g eslint'
                    sh 'eslint --init --max-errors=0 --max-warnings=3 --fix'
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    sh 'echo "Testing..."'
                    sh 'NODE_OPTIONS="--max-old-space-size=4096" npm test --verbose --maxWorkers=2 --coverage --coverageReporters=text-lcov --outputFile=coverage/lcov.info'
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    sh 'echo "Building..."'
                    sh 'npm run build'
                }
            }
        }
    }
}
