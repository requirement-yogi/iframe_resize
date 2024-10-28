import Spinner from "@atlaskit/spinner";

import styles from "./LoadingPage.module.scss";

const LoadingPage = () => {
    return (
        <div className={styles.container}>
            <Spinner size="large" />
        </div>
    );
};

export default LoadingPage;
