import Vue from "vue"
import {
    Form,
    Button,
    FormItem,
    Input,
    Message,
    Header,
    Container,
    Aside,
    Main,
    Menu,
    Submenu,
    MenuItemGroup,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Row,
    Col,
    Table,
    TableColumn,
    Switch,
    Tooltip,
    Pagination,
    Dialog,
    MessageBox,
    Tag,
    Tree,
    Select,
    Option
} from "element-ui";
Vue.use(Option);
Vue.use(Select);
Vue.use(Tree);
Vue.use(Tag);
Vue.use(Dialog);
Vue.use(Pagination);
Vue.use(Tooltip);
Vue.use(Switch);
Vue.use(Form);
Vue.use(Button);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Header);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu, );
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Table);
Vue.use(TableColumn);
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message;