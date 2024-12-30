pipeline {
    agent any
    tools {
        nodejs 'node23'
    }
    stages {
        stage('Install') {
            steps {
                script {
                    echo "--------------------------------------------------"
                    echo "--------------------------------------------------"
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
                    sh 'npm test'
                }
            }
        }
        stage('Publish Coverage') {
            steps {
                script {
                    sh 'echo "Publishing Coverage..."'
                    // Check for the existence of the coverage report
                    sh 'ls -l coverage/cobertura-coverage.xml'
                }
                recordCoverage(tools: [[parser: 'COBERTURA', pattern: 'coverage/cobertura-coverage.xml']], sourceCodeRetention: 'EVERY_BUILD')
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
        stage('Deploy') {
            steps {
                script {
                    sh 'echo "Deploying..."'
                    // Deploy to the server
                    kubeDeploy(configs: 'kubeconfig', namespace: 'default', resourceType: 'deployment', resourceNames: 'myapp', replicas: 3)
                }
            }
        }
        stage('Notify') {
            steps {
                script {
                    sh 'echo "Notifying..."'
                    sh "Build ${env.BUILD_NUMBER} of ${env.JOB_NAME} succeeded"
                }
            }
        }
    }
}
