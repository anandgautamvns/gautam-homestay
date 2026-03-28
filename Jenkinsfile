pipeline {
    agent any

    environment {
        IMAGE_NAME     = 'gautam-homestay'
        IMAGE_TAG      = "${env.BUILD_NUMBER}"
        DOCKER_REGISTRY = credentials('docker-registry-credentials') // set in Jenkins
        CONTAINER_PORT = '3000'
        HOST_PORT      = '3000'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
                echo "Building branch: ${env.BRANCH_NAME}, commit: ${env.GIT_COMMIT}"
            }
        }

        stage('Install Dependencies') {
            agent {
                docker {
                    image 'node:20-alpine'
                    args '-v /tmp/yarn-cache:/root/.yarn'
                    reuseNode true
                }
            }
            steps {
                sh 'yarn install --frozen-lockfile'
            }
        }

        stage('Lint') {
            agent {
                docker {
                    image 'node:20-alpine'
                    reuseNode true
                }
            }
            steps {
                sh 'yarn lint'
            }
        }

        stage('Build') {
            agent {
                docker {
                    image 'node:20-alpine'
                    reuseNode true
                }
            }
            environment {
                NEXT_TELEMETRY_DISABLED = '1'
            }
            steps {
                sh 'yarn build'
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    def fullImage = "${env.DOCKER_REGISTRY_USR}/${IMAGE_NAME}:${IMAGE_TAG}"
                    def latestImage = "${env.DOCKER_REGISTRY_USR}/${IMAGE_NAME}:latest"

                    sh "docker build -t ${fullImage} -t ${latestImage} ."

                    withCredentials([usernamePassword(
                        credentialsId: 'docker-registry-credentials',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )]) {
                        sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                        sh "docker push ${fullImage}"
                        sh "docker push ${latestImage}"
                    }
                }
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                script {
                    def fullImage = "${env.DOCKER_REGISTRY_USR}/${IMAGE_NAME}:${IMAGE_TAG}"

                    // Stop and remove existing container, then run new one
                    sh """
                        docker stop ${IMAGE_NAME} || true
                        docker rm ${IMAGE_NAME} || true
                        docker run -d \
                            --name ${IMAGE_NAME} \
                            --restart unless-stopped \
                            -p ${HOST_PORT}:${CONTAINER_PORT} \
                            -e NODE_ENV=production \
                            ${fullImage}
                    """
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline succeeded — build #${env.BUILD_NUMBER} deployed."
        }
        failure {
            echo "Pipeline failed on stage. Check logs above."
        }
        always {
            sh 'docker logout || true'
            cleanWs()
        }
    }
}
