package com.requirementyogi.cloud.common.config;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.Properties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.boot.logging.DeferredLog;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.Profiles;
import org.springframework.core.env.PropertiesPropertySource;
import org.springframework.stereotype.Component;

@Component
@Profile("dev")
public class EnvironmentConfiguration implements EnvironmentPostProcessor, ApplicationListener<ApplicationEvent> {

    /**
     * Logger.
     * <p>
     * We use deferred logs because this processor is triggered before the application is started.
     * </p>
     */
    private static final DeferredLog log = new DeferredLog();

    /**
     * Loads environment variables from the closest environment file when using the development profile.
     * @param environment the environment
     * @param application the application
     */
    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        if (environment.acceptsProfiles(Profiles.of("dev"))) {
            if (!isRunningInsideDocker()) {
                loadEnvFile(environment);
            } else {
                log.info("Not loading the environment file because the application is running inside Docker.");
            }
        }
    }

    /**
     * Replays deferred logs when the application is started.
     * @param event the application event
     */
    @Override
    public void onApplicationEvent(ApplicationEvent event) {
        log.replayTo(EnvironmentConfiguration.class);
    }

    /**
     * Determines if the application is running inside a Docker container.
     * @return {@code true} if the application is running inside a Docker container; {@code false} otherwise.
     */
    private boolean isRunningInsideDocker() {
        File dockerEnvFile = new File("/.dockerenv");
        return dockerEnvFile.exists();
    }

    /**
     * Loads environment variables from the closest environment file.
     * @param environment the environment
     */
    private void loadEnvFile(ConfigurableEnvironment environment) {
        Optional<File> envFile = findFile(".env");
        if (envFile.isPresent()) {
            File file = envFile.get();
            try (FileInputStream fileInputStream = new FileInputStream(file)) {
                Properties properties = new Properties();
                properties.load(fileInputStream);
                PropertiesPropertySource propertySource = new PropertiesPropertySource("dotenv", properties);
                environment.getPropertySources().addFirst(propertySource);
                log.info("Loaded environment variables from the environment file: " + file.getAbsolutePath());
            } catch (IOException exception) {
                throw new IllegalStateException(
                    "Failed to load environment variables from the environment file: " + file.getAbsolutePath(),
                    exception
                );
            }
        } else {
            throw new IllegalStateException(
                "No environment file was found. " +
                    "Please make sure you have a .env file at the root of the repository."
            );
        }
    }

    /**
     * Searches for a file by name in the current directory and in parent directories until the file is found or the
     * root directory is reached.
     * @param name the name of the file
     * @return the desired file, if found
     */
    private Optional<File> findFile(String name) {
        File currentDirectory = new File(System.getProperty("user.dir"));
        File file = new File(currentDirectory, name);

        while (!file.exists() && currentDirectory.getParentFile() != null) {
            currentDirectory = currentDirectory.getParentFile();
            file = new File(currentDirectory, name);
        }

        return file.exists() ? Optional.of(file) : Optional.empty();
    }

}
