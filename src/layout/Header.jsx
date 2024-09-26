import { useSelector } from 'react-redux';
import BurgerMenu2 from '../assets/Icons/BurgerMenu2';
import DropDown from '../components/DropDown';
import LogoutModal from '../common/LogoutModal';
import { useState } from 'react';
import logo from '../../public/icon.png';
import { useWindowSize } from '@uidotdev/usehooks';
import BurgerMenu from '../assets/Icons/BurgerMenu';

const Header = ({ setIsOpen, isOpen }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const size = useWindowSize();
  const { main } = useSelector((state) => state);

  return (
    <>
      <header className="d-flex shadow fixed_Header">
        <div className="d-flex vw-100 justify-content-between align-items-center bgDarkPrimary p-4">
          <div className="d-flex justify-content-between align-items-center my-2 gap-3">
            <BurgerMenu2 setIsOpen={setIsOpen} isOpen={isOpen} />
            {/* <BurgerMenu setIsOpen={setIsOpen} isOpen={isOpen} /> */}
            <DropDown
              className={'text-white'}
              variant={'none'}
              title={
                <span
                  className="text-white d-flex justify-content-center align-items-center gap-1 h-fit-content"
                  style={{ height: '22px' }}>
                  {size && size.width > 600 && <span>{main?.userRole?.fullName}</span>}
                  <i className="text-white bi bi-person font25 p-0" />
                </span>
              }
              options={[
                {
                  title: 'مشاهده اطلاعات حساب کاربری',
                  className: 'p-2',
                  onclick: () => console.log('user data')
                },
                {
                  title: 'خروج',
                  className: 'p-2',
                  onclick: () => setShowLogoutModal(true)
                }
              ]}
            />
          </div>
          <div className="w-fit-content me-auto px-2">
            <span className="font20 fw-bold text-white">تسک منیجر</span>
          </div>
          <img
            style={{ width: '50px', height: '50px' }}
            className="object-fit-cover"
            src={logo}
            alt=""
          />{' '}
        </div>
      </header>

      <LogoutModal toggle={showLogoutModal} setToggle={setShowLogoutModal} />
    </>
  );
};

export default Header;
