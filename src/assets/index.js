//Este index es el encargado de exportar todos estos assets para que cuando yo importe la carpeta assets, sea capaz de acceder a cualquier imagen que tengo aca adentro. Simplemente importando el index.

//Los svg se pueden importar como componentes de la siguiente manera.
import {ReactComponent as LogoCifeeWhite} from './svg/Cifeewhite.svg';
import {ReactComponent as LogoCifeeBlack} from './svg/Cifeeblack.svg';

//Importamos todas las imagenes de assets.
import authBg from './jpg/auth-bg.jpg';
import homeBanner from './jpg/home-banner.jpg';
import noAvatar from './jpg/no-avatar.jpg';
import academyLogo from './png/academy-logo.png';
import logoCifee from './png/Cifee.png';



//Para que cuando exporte Icon pueda hacer <Icon.Logowhite /> como un componente
const Icon = {
    LogoCifeeWhite,
    LogoCifeeBlack
};

const image = {
    authBg,
    homeBanner,
    noAvatar,
    academyLogo,
    logoCifee
}

export { Icon, image };

