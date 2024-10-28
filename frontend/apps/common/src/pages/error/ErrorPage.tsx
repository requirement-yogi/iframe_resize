import styles from "./ErrorPage.module.scss";

const ErrorPage = () => {
    return (
        <div className={styles.container}>
            <h1>Oops! Something went wrong.</h1>
            <p>If the problem persists, please contact our support team.</p>
        </div>
    );
};

export default ErrorPage;
