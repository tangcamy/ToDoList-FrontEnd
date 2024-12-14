import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; //引用提示訊息框框

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;

  padding: 0 16px;
  p {
    font-size: 14px;
    font-weight: 300;
    margin: 2rem 0 1rem;
  }
`;

const StyledButton = styled.button`
  padding: 0;
  border: 0;
  background: none;
  vertical-align: baseline;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
  outline: 0;

  font-size: 14px;
  font-weight: 300;
  margin: 2rem 0 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = ({ itemCounts }) => {
  const navigate = useNavigate();
  const handelLogoff = () => {
    //登出表示localStorage的authToken移除，並將頁面切換到登入
    localStorage.removeItem('authToken');
    navigate('/login');
    Swal.fire({
      title: '已登出!',
      icon: 'success',
      showConfirmButton: false,
      timer: 2000, //出現時間
      position: 'top', //出現的位置
    });
  };

  return (
    <StyledFooter>
      <p>剩餘項目數： {itemCounts} </p>
      <StyledButton onClick={handelLogoff}>登出</StyledButton>
    </StyledFooter>
  );
};

export default Footer;
