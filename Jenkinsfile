pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                script {
                    echo "Git URL: ${env.GIT_URL}"
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
