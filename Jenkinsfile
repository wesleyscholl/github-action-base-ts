pipeline {
    agent any
    tools {
        nodejs 'node23'
        docker 'latest'  
    }
    stages {
        stage('Install Dependencies') {
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
        stage('Creating Image') {
            steps {
                script {
                    sh 'echo "Creating Image..."'
                    sh 'docker build . -t app'
                    // Create manifest file for container
                    sh '''cat <<EOF > app.yaml
                        apiVersion: apps/v1
                        kind: Deployment
                        metadata:
                        name: app
                        spec:
                        replicas: 1
                        selector:
                            matchLabels:
                            app: app
                        template:
                            metadata:
                            labels:
                                app: app
                            spec:
                            containers:
                            - name: app
                                image: app
                                ports:
                                - containerPort: 3000
                        EOF'''
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    withKubeConfig([credentialsId: 'kubeconfig', serverUrl: 'https://kubernetes.default.svc.cluster.local']) {
                        sh 'echo "Deploying..."'
                        sh 'kubectl apply -f app.yaml'
                        sh 'kubectl get pods --watch'
                        sh 'until kubectl get pods | grep app | grep -m 1 "Running"; do sleep 5; done'
                    }
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
