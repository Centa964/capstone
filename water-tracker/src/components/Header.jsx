//logo and welcome message


const Header = ({openSettings}) => {
  return (
    <header>
      <img src={logo} alt="water tracker logo" />
      <h1>HYDRA</h1>
      <button onClick={openSettings}></button>
    </header>
  )
}

export default Header;