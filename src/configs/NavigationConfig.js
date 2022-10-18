import { 
  DashboardOutlined,
  MediumOutlined,
  AmazonOutlined,
  BehanceOutlined,
  SketchOutlined,
  BulbOutlined,
  RightSquareOutlined,
} from '@ant-design/icons';
import { AppRoute } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'Main Positions',
  path: AppRoute.position,
  title: 'Main Position',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'clients',
      path: AppRoute.clients,
      title: 'Clients',
      icon: SketchOutlined,
      breadcrumb: true,
      submenu: []
    }, {
      key: 'apple',
      path: AppRoute.apple,
      title: 'apple',
      icon: BehanceOutlined,
      breadcrumb: true,
      submenu: []
    }, {
      key: 'summer',
      path: AppRoute.summer,
      title: 'summer',
      icon: BulbOutlined,
      breadcrumb: true,
      submenu: []
    }, {
      key: 'tree',
      path: AppRoute.tree,
      title: 'tree',
      icon: MediumOutlined,
      breadcrumb: true,
      submenu: []
    },
  ]
  }, {
  key: 'house',
  path: AppRoute.house,
  title: 'house',
  icon: AmazonOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'flat',
      path: AppRoute.flat,
      title: 'flat',
      icon: RightSquareOutlined,
      breadcrumb: true,
      submenu: []
    }, {
      key: 'accommodation',
      path: AppRoute.accommodation,
      title: 'accommodation',
      icon: '',
      breadcrumb: false,
      submenu: [
        {
          key: 'one bedroom',
          path: AppRoute.oneBedroom,
          title: 'one bedroom',
          icon: '',
          breadcrumb: true,
          submenu: []
        }, {
          key: '2 bedroom',
          path: AppRoute.twoBedroom,
          title: '2 bedroom',
          icon: '',
          breadcrumb: true,
          submenu: []
        }, {
          key: 'studio',
          path: AppRoute.studio,
          title: 'studio',
          icon: '',
          breadcrumb: true,
          submenu: []
        },
      ]
    }, {
      key: 'townhouse',
      path: AppRoute.townhouse,
      title: 'townhouse',
      icon: RightSquareOutlined,
      breadcrumb: true,
      submenu: []
    },
  ]
  }, 
];

const navigationConfig = [
  ...dashBoardNavTree
]

export default navigationConfig;
