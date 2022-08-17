import React from 'react';
import { RouteObject } from 'react-router-dom';
import App from '../index'
import ButtonExemple from '../exemples/ButtonExemple'
import IconExemple from '../exemples/IconExemple'
import TitleExemple from '../exemples/TitleExemple'
import CardExemple from '../exemples/CardExemple'
import TabsExemple from '../exemples/TabsExemple'
import MessageExemple from '../exemples/MessageExemple'
import ModalExemple from '../exemples/ModalExemple'
import SelectExemple from '../exemples/SelectExemple'
import DrawerExemple from '../exemples/DrawerExemple'
import SideMenuExemple from '../exemples/SideMenuExemple'
import TableExemple from '../exemples/TableExemple'
import InputExemple from '../exemples/InputExemple'
import ImageExemple from '../exemples/ImageExemple'
import UploadExemple from '../exemples/UploadExemple'
import FormExemple from '../exemples/FormExemple'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'buttonExemple',
        element: <ButtonExemple />,
      },
      {
        path: 'iconExemple',
        element: <IconExemple />,
      },
      {
        path: 'titleExemple',
        element: <TitleExemple />,
      },
      {
        path: 'cardExemple',
        element: <CardExemple />,
      },
      {
        path: 'tabsExemple',
        element: <TabsExemple />,
      },
      {
        path: 'messageExemple',
        element: <MessageExemple />,
      },
      {
        path: 'modalExemple',
        element: <ModalExemple />,
      },
      {
        path: 'drawerExemple',
        element: <DrawerExemple />,
      },
      {
        path: 'selectExemple',
        element: <SelectExemple />,
      },
      {
        path: 'sideMenuExemple',
        element: <SideMenuExemple />,
      },
      {
        path: 'tableExemple',
        element: <TableExemple />,
      },
      {
        path: 'inputExemple',
        element: <InputExemple />,
      },
      {
        path: 'imageExemple',
        element: <ImageExemple />,
      },
      {
        path: 'uploadExemple',
        element: <UploadExemple />,
      },
      {
        path: 'formExemple',
        element: <FormExemple />,
      },
    ],
  },
];
