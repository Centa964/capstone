//logo and welcome message


const Header = ({openSettings}) => {
  return (
    <header>
      <h1>HYDRA</h1>
      <button onClick={openSettings}></button>
    </header>
  )
}

export default Header;