import Styles from './RotativeLetterHome.module.css';

export const RotativeLetterHome = () => {
    return (
        <>
            <div className={Styles.ContainRotativeLetterHome}>
                <ul className={Styles.ulRotativeLetterHome}>
                    <li className={Styles.liRotativeLetterHome}>Aventuras</li>
                    <li>Vivencias</li>
                    <li>Sensaciones</li>
                    <li>Experiencias</li>
                    <li>Aventuras</li>
                </ul>
            </div>
        </>
    );
}
