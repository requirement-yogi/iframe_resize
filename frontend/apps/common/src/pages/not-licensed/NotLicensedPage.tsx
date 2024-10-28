import styles from "./NotLicensedPage.module.scss";

const NotLicensedPage = () => {
    return (
        <div className={styles.container}>
            <h1>Not licensed</h1>
            <p>Your license is not active.</p>
        </div>
    );
};

export default NotLicensedPage;
