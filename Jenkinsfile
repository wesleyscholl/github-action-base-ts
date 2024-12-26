pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                script {
                    echo "Git URL: ${env.GIT_URL}"
                    echo "Branch: ${env.GIT_BRANCH}"
                    echo "Commit: ${env.GIT_COMMIT}"
                    echo "Previous Commit: ${env.GIT_PREVIOUS_COMMIT}"
                    echo "Author: ${env.GIT_COMMITTER_NAME}"
                    echo "Email: ${env.GIT_COMMITTER_EMAIL}"
                    echo "Message: ${env.GIT_COMMIT_MESSAGE}"
                    echo "Date: ${env.GIT_COMMIT_TIMESTAMP}"
                    echo "Build Number: ${env.BUILD_NUMBER}"
                    echo "Build ID: ${env.BUILD_ID}"
                    echo "Build URL: ${env.BUILD_URL}"
                    echo "Workspace: ${env.JOB_URL}"
                    echo "Node: ${env.NODE_NAME}"
                    echo "EXECUTOR_NUMBER: ${env.EXECUTOR_NUMBER}"
                    echo "ENV: ${env}"
                }
            }
        }
        stage('Lint') {
            steps {
                script {
                    sh 'echo "Running lint..."'
                    sh 'npx eslint .'
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    sh 'echo "Building..."'
                    sh 'npm install'
                    sh 'npm run build'
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
    }
}
