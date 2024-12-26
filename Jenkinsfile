pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                script {
                    echo "Git URL: ${env.GIT_URL}"
                    echo "Branch: ${env.BRANCH_NAME}"
                    echo "Commit: ${env.GIT_COMMIT}"
                    echo "Author: ${env.GIT_AUTHOR_NAME}"
                    echo "Email: ${env.GIT_AUTHOR_EMAIL}"
                    echo "Message: ${env.GIT_COMMIT_MESSAGE}"
                    echo "Date: ${env.GIT_COMMIT_TIMESTAMP}"
                    echo "Build Number: ${env.BUILD_NUMBER}"
                    echo "Build ID: ${env.BUILD_ID}"
                    echo "Build URL: ${env.BUILD_URL}"
                    echo "Workspace: ${env.WORKSPACE}"
                }
            }
        }
        stage('Lint') {
            steps {
                script {
                    sh 'echo "Running lint..."'
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    sh 'echo "Building..."'
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    sh 'echo "Testing..."'
                }
            }
        }
    }
}
