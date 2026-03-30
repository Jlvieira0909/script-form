export interface AppState {
  tenantId: string;
  buttonsAnchor: string;
  storeDomain: string;
  permalinkSelector: string;
  stockBreakSelector: string;
  imagePDPSelector: string;
  addToCartSelector: string;
  onPageSelector: string;
  isDefaultPermalink: boolean;
  isQuebraEstoque: boolean;
  isImagemPDP: boolean;
  isAddToCart: boolean;
  isOnPage: boolean;
  isComparacao: boolean;
  selectedLangs: string[];
  translations: Record<
    string,
    { btnVirtual: string; btnSize: string; txtRec: string }
  >;
  storeName: string;
  storeGender: string;
  isCustomLanguage: boolean;
  isMetric: boolean;
  isMeasurementSwitcher: boolean;
  isSkinTones: boolean;
  isFilterChart: boolean;
  isBodyAdjustment: boolean;
  isCalculating: boolean;
  selectedButtonStyle: number;
}
