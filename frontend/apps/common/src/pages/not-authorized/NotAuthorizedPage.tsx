import styles from "./NotAuthorizedPage.module.scss";

const NotAuthorizedPage = () => {
    return (
        <div className={styles.container}>
            <h1>Not Authorized</h1>
            <p>You are not authorized to access this resource.</p>
        </div>
    );
};

export default NotAuthorizedPage;
