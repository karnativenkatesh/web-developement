const Logout = () => {
    sessionStorage.removeItem("Registernum");
    localStorage.clear();
    window.location.href="/";
}

export default Logout;