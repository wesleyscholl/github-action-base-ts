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
        stage('Test') {
            steps {
                script {
                    sh 'echo "Testing..."'
                    sh 'NODE_OPTIONS="--max-old-space-size=4096" npm test --verbose -- --maxWorkers=2 --runInBand'
                }
                post {
                    always {
                        step([$class: 'CoberturaPublisher', coberturaReportFile: 'output/coverage/jest/cobertura-coverage.xml'])
                    }
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
