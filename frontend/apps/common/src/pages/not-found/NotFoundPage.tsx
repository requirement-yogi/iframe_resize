import styles from "./NotFoundPage.module.scss";

const NotFoundPage = () => {
    return (
        <div className={styles.container}>
            <h1>Not Found</h1>
            <p>The requested resource was not found.</p>
        </div>
    );
};

export default NotFoundPage;
