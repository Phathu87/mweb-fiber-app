import CenturyCityConnect from './providers/centurycityconnect.png';
import OpenserveWebConnect from './providers/openservewebconnect.png';
import Evotel from './providers/evotel.png';
import Octotel from './providers/octotel.png';
import Vumatel from './providers/vumatel.png';
import OpenServe from './providers/openserve.png';
import Frogfoot from './providers/frogfoot.png';
import MetroFibre from './providers/metrofibre.png';
import LinkAfrica from './providers/linkafrica.png';
import LinkLayer from './providers/linklayer.png';
import LightStruck from './providers/lightstruck.png';
import Vodacom from './providers/vodacom.png';
import ZoomFibre from './providers/zoomfibre.png';
import MFN from './providers/mfn.png';
import MFNNOVA from './providers/mfnnova.png';
import WebConnect from './providers/webconnect.png';
import Thinkspeed from './providers/thinkspeed.png';
import FrogfootAir from './providers/frogfootair.png';
import Comtel from './providers/comtel.png';
import TTConnect from './providers/ttconnect.png';
import Balwin from './providers/balwin.png';
import DNATel from './providers/dnatel.png';
import FibreGeeks from './providers/fibreegeeks.png';
import Cybersmart from './providers/cybersmart.png';
import FibreSuburbNetworks from './providers/fibresuburb.png';
import ClearAccess from './providers/clearaccess.png';
import GaiaFibonacci from './providers/gaiafibonacci.png';
import Mitsol from './providers/mitsol.png'; 

const logos = {
  balwin: Balwin,
  clearaccess: ClearAccess,
  comtel: Comtel,
  cybersmart: Cybersmart,
  dnatel: DNATel,
  fibresuburbnetworks: FibreSuburbNetworks,
  fibregeeks: FibreGeeks,
  frogfoot: Frogfoot,
  frogfootair: FrogfootAir,
  gaiafibonacci: GaiaFibonacci,
  lightstruck: LightStruck,
  linkafrica: LinkAfrica,
  linklayer: LinkLayer,
  mfn: MFN,
  mfnnova: MFNNOVA,
  metrofibre: MetroFibre,
  mitsol: Mitsol,
  octotel: Octotel,
  openserve: OpenServe,
  openservewebconnect: OpenserveWebConnect,
  thinkspeed: Thinkspeed,
  tt: TTConnect,
  ttconnect: TTConnect,
  vodacom: Vodacom,
  vumatel: Vumatel,
  zoomfibre: ZoomFibre,
  webconnect: WebConnect,
  evotel: Evotel,
  centurycityconnect: CenturyCityConnect,
};

export function getProviderLogo(provider) {
  if (!provider) return '';
  const key = provider.replace(/\s+/g, '').toLowerCase();
  return logos[key] || '';
}
