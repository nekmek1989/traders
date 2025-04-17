export const lockHTMLElement = (): void => {
    const scrollY = window.scrollY;
    document.documentElement.classList.add('is-lock');
    document.body.classList.add('is-lock');
    document.body.style.top = `-${scrollY}px`;
    document.body.dataset.scrollY = `${scrollY}`;
}

export const unlockHTMLElement = (): void => {
    const scrollY = document.body.dataset.scrollY;
    document.documentElement.classList.remove('is-lock');
    document.body.classList.remove('is-lock');
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0'));
}