/** @format */
import load from '../../assets/HenryLoading.gif'
export const Loading = () => {
    return (
        <>
            <img
                src={load}
                alt='loading...'
                style={{
                    width: '100%',
                    height: '100%',
                }}
            />
        </>
    )
}
