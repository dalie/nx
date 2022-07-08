import { Outlet } from 'react-router-dom';
import Ui from '../ui/ui';
import Map from '../map/map';

/* eslint-disable-next-line */
export interface LayoutProps {}

export function Layout(props: LayoutProps) {
  return (
    <>
      <Map />
      <Ui>
        <Outlet />
      </Ui>
    </>
  );
}

export default Layout;
