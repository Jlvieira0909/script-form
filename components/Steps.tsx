import { useState, useEffect, useRef } from "react";
import { TextInput, ToggleBlock, SelectInput, SwitcherOptions } from "./UI";
import { LANGUAGES } from "../constants";

export const LanguageSelector = ({
  selectedLangs,
  onToggleLang,
  appLang,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      )
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="MainFormTextInput">
      <h1 className="MainFormTextInputTitle">
        {appLang === "EN" ? "Languages" : "Idiomas"}
      </h1>
      <div className="CustomSelectContainer" ref={selectRef}>
        <div className="CustomSelectTrigger" onClick={() => setIsOpen(!isOpen)}>
          {selectedLangs.length === 0
            ? appLang === "EN"
              ? "Select languages"
              : "Selecione os idiomas"
            : `${selectedLangs.length} ${
                appLang === "EN" ? "selected" : "selecionados"
              }`}
        </div>
        {isOpen && (
          <div className="CustomSelectMenu">
            {LANGUAGES.map((lang) => {
              const label = appLang === "EN" ? lang.labelEN : lang.labelBR;
              return (
                <div
                  key={lang.value}
                  className={`CustomSelectOption ${
                    selectedLangs.includes(lang.value) ? "selected" : ""
                  }`}
                  onClick={() => onToggleLang(lang.value)}
                >
                  <input
                    type="checkbox"
                    checked={selectedLangs.includes(lang.value)}
                    readOnly
                    className="CustomSelectCheckbox"
                  />
                  <span>{label}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {selectedLangs.length > 0 && (
        <div className="SelectedTagsContainer">
          {selectedLangs.map((val: string) => {
            const langObj = LANGUAGES.find((l) => l.value === val);
            const label = langObj
              ? appLang === "EN"
                ? langObj.labelEN
                : langObj.labelBR
              : "";
            const flag = label ? label.split(" ")[0] : "";
            return (
              <div
                key={val}
                className="SelectedTag"
                onClick={() => onToggleLang(val)}
              >
                <span>{flag}</span>
                <span>{val.toUpperCase()}</span>
                <span className="SelectedTagRemove">×</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const TranslationManager = ({
  selectedLangs,
  translations,
  onChange,
  appLang,
}: any) => {
  if (selectedLangs.length === 0) return null;
  return (
    <div className="TranslationsContainer">
      {selectedLangs.map((val: string) => {
        const langObj = LANGUAGES.find((l) => l.value === val);
        const label = langObj
          ? appLang === "EN"
            ? langObj.labelEN
            : langObj.labelBR
          : val.toUpperCase();
        return (
          <div key={`trans-${val}`} className="TranslationCard">
            <h2 className="TranslationCardTitle">{label}</h2>
            <div className="TranslationInputGroup">
              <label>
                {appLang === "EN"
                  ? "Virtual Fitting Room Button"
                  : "Botão do Provador Virtual"}
              </label>
              <input
                className="MainFormTextInputInput"
                type="text"
                value={translations[val]?.btnVirtual || ""}
                onChange={(e) => onChange(val, "btnVirtual", e.target.value)}
              />
            </div>
            <div className="TranslationInputGroup">
              <label>
                {appLang === "EN"
                  ? "Size Chart Button"
                  : "Botão da Tabela de Medidas"}
              </label>
              <input
                className="MainFormTextInputInput"
                type="text"
                value={translations[val]?.btnSize || ""}
                onChange={(e) => onChange(val, "btnSize", e.target.value)}
              />
            </div>
            <div className="TranslationInputGroup">
              <label>
                {appLang === "EN"
                  ? "Recommendation Text"
                  : "Texto de Recomendação"}
              </label>
              <input
                className="MainFormTextInputInput"
                type="text"
                value={translations[val]?.txtRec || ""}
                onChange={(e) => onChange(val, "txtRec", e.target.value)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const Step1Script = ({
  state,
  updateState,
  appLang,
  tooltips,
  handleToggleLang,
  handleTranslationChange,
}: any) => (
  <div className="StepContent">
    <TextInput
      title="Tenant ID"
      placeholder={appLang === "EN" ? "Store Tenant" : "Tenant da Loja"}
      tooltip={tooltips.tenant}
      value={state.tenantId}
      onChange={(v: string) => updateState("tenantId", v)}
    />
    <TextInput
      title="Buttons Anchor"
      placeholder={
        appLang === "EN"
          ? "CSS Selector for Buttons Anchoring"
          : "Seletor CSS para Ancoragem dos Botões"
      }
      tooltip={tooltips.buttonsAnchor}
      value={state.buttonsAnchor}
      onChange={(v: string) => updateState("buttonsAnchor", v)}
    />

    <ToggleBlock
      title="Default Permalink"
      checked={state.isDefaultPermalink}
      onChange={(v: boolean) => updateState("isDefaultPermalink", v)}
      tooltip={tooltips.defaultPermalink}
    >
      {!state.isDefaultPermalink && (
        <div className="MainFormToggleInputTextInputs">
          <input
            className="MainFormTextInputInput"
            type="text"
            placeholder={
              appLang === "EN" ? "Your store domain" : "Domínio da sua loja"
            }
            value={state.storeDomain}
            onChange={(e) => updateState("storeDomain", e.target.value)}
          />
          <span className="MainFormToggleInputTextInputsSeparator">+</span>
          <input
            className="MainFormTextInputInput"
            type="text"
            placeholder="Product ID CSS Selector"
            value={state.permalinkSelector}
            onChange={(e) => updateState("permalinkSelector", e.target.value)}
          />
        </div>
      )}
    </ToggleBlock>

    <ToggleBlock
      title={appLang === "EN" ? "Stock Break" : "Quebra de Estoque"}
      checked={state.isQuebraEstoque}
      onChange={(v: boolean) => updateState("isQuebraEstoque", v)}
      tooltip={tooltips.stockBreak}
    >
      {state.isQuebraEstoque && (
        <div className="MainFormToggleInputTextInputs">
          <input
            className="MainFormTextInputInput"
            type="text"
            placeholder={
              appLang === "EN"
                ? "Available Sizes CSS Selector"
                : "Seletor CSS dos Tamanhos Disponíveis"
            }
            value={state.stockBreakSelector}
            onChange={(e) => updateState("stockBreakSelector", e.target.value)}
          />
        </div>
      )}
    </ToggleBlock>

    <ToggleBlock
      title={appLang === "EN" ? "Image on PDP" : "Imagem na PDP"}
      checked={state.isImagemPDP}
      onChange={(v: boolean) => updateState("isImagemPDP", v)}
      tooltip={tooltips.imagePDP}
    >
      {state.isImagemPDP && (
        <div className="MainFormToggleInputTextInputs">
          <input
            className="MainFormTextInputInput"
            type="text"
            placeholder={
              appLang === "EN"
                ? "Product Image CSS Selector"
                : "Seletor CSS da Imagem do Produto"
            }
            value={state.imagePDPSelector}
            onChange={(e) => updateState("imagePDPSelector", e.target.value)}
          />
        </div>
      )}
    </ToggleBlock>

    <ToggleBlock
      title="Add To Cart"
      checked={state.isAddToCart}
      onChange={(v: boolean) => updateState("isAddToCart", v)}
      tooltip={tooltips.addToCart}
    >
      {state.isAddToCart && (
        <div className="MainFormToggleInputTextInputs">
          <input
            className="MainFormTextInputInput"
            type="text"
            placeholder={
              appLang === "EN"
                ? "Buy Button CSS Selector"
                : "Seletor CSS do Botão de Comprar"
            }
            value={state.addToCartSelector}
            onChange={(e) => updateState("addToCartSelector", e.target.value)}
          />
        </div>
      )}
    </ToggleBlock>

    <ToggleBlock
      title="OnPage"
      checked={state.isOnPage}
      onChange={(v: boolean) => updateState("isOnPage", v)}
      tooltip={tooltips.onPage}
    />

    {state.isOnPage && (
      <div className="MainFormToggleInput">
        <h1 className="MainFormTextInputTitle">
          {appLang === "EN" ? "Size Selector" : "Seletor de Tamanhos"}
        </h1>
        <div className="MainFormToggleInputTextInputs">
          <input
            className="MainFormTextInputInput"
            type="text"
            placeholder={
              appLang === "EN"
                ? "Product Sizes CSS Selector"
                : "Seletor CSS dos Tamanhos do Produto"
            }
            value={state.onPageSelector}
            onChange={(e) => updateState("onPageSelector", e.target.value)}
          />
        </div>
      </div>
    )}

    <ToggleBlock
      title={
        appLang === "EN"
          ? "Shoes Brands Comparison"
          : "Comparação de Marcas Shoes"
      }
      checked={state.isComparacao}
      onChange={(v: boolean) => updateState("isComparacao", v)}
      tooltip={tooltips.brands}
    />

    <LanguageSelector
      selectedLangs={state.selectedLangs}
      onToggleLang={handleToggleLang}
      appLang={appLang}
    />
    <TranslationManager
      selectedLangs={state.selectedLangs}
      translations={state.translations}
      onChange={handleTranslationChange}
      appLang={appLang}
    />
  </div>
);

export const Step2Config = ({ state, updateState, appLang, tooltips }: any) => (
  <div className="StepContent">
    <TextInput
      title={appLang === "EN" ? "Store Name" : "Nome da Loja"}
      placeholder={appLang === "EN" ? "My Awesome Store" : "Minha Loja"}
      tooltip={tooltips.storeName}
      value={state.storeName}
      onChange={(v: string) => updateState("storeName", v)}
    />
    <SelectInput
      title={appLang === "EN" ? "Store Gender" : "Gênero da Loja"}
      tooltip={tooltips.gender}
      value={state.storeGender}
      onChange={(v: string) => updateState("storeGender", v)}
      options={[
        { value: "F", label: appLang === "EN" ? "Female" : "Feminino" },
        { value: "M", label: appLang === "EN" ? "Male" : "Masculino" },
        { value: "U", label: appLang === "EN" ? "Unisex" : "Unissex" },
      ]}
    />
    <ToggleBlock
      title="Custom Language"
      checked={state.isCustomLanguage}
      onChange={(v: boolean) => updateState("isCustomLanguage", v)}
      tooltip={tooltips.customLang}
    />
    <SwitcherOptions
      title={appLang === "EN" ? "Measurement Unit" : "Unidade de Medidas"}
      leftOption="CM"
      rightOption="IN"
      isRight={state.isMetric}
      onChange={(v: boolean) => updateState("isMetric", v)}
      tooltip={tooltips.units}
    />
    <ToggleBlock
      title={appLang === "EN" ? "Measurement Switcher" : "Switcher de Medidas"}
      checked={state.isMeasurementSwitcher}
      onChange={(v: boolean) => updateState("isMeasurementSwitcher", v)}
      tooltip={tooltips.measSwitcher}
    />
    <ToggleBlock
      title="Skin Tones"
      checked={state.isSkinTones}
      onChange={(v: boolean) => updateState("isSkinTones", v)}
      tooltip={tooltips.skinTones}
    />
    <ToggleBlock
      title={
        appLang === "EN"
          ? "Filter Chart by Clothes Type"
          : "Filtro da Tabela de Medidas"
      }
      checked={state.isFilterChart}
      onChange={(v: boolean) => updateState("isFilterChart", v)}
      tooltip={tooltips.filterChart}
    />
    <div className="MainFormToggleInput" style={{ marginTop: "16px" }}>
      <div className="TitleWrapper">
        <h1 className="MainFormTextInputTitle" style={{ fontSize: "1.2rem" }}>
          Optional Steps
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "8px",
        }}
      >
        <ToggleBlock
          title="Body Adjustment"
          checked={state.isBodyAdjustment}
          onChange={(v: boolean) => updateState("isBodyAdjustment", v)}
          tooltip={tooltips.bodyAdj}
        />
        <ToggleBlock
          title={
            appLang === "EN"
              ? "Calculating Screen"
              : "Tela de Cálculos Concluídos"
          }
          checked={state.isCalculating}
          onChange={(v: boolean) => updateState("isCalculating", v)}
          tooltip={tooltips.calc}
        />
      </div>
    </div>
  </div>
);

export const Step3Theme = ({ state, updateState, appLang }: any) => (
  <div className="StepContent">
    <div className="TitleWrapper" style={{ marginBottom: "16px" }}>
      <h1 className="MainFormTextInputTitle" style={{ fontSize: "1.2rem" }}>
        {appLang === "EN"
          ? "Create Button Styles"
          : "Crie a Estilização dos Botões"}
      </h1>
    </div>
    <div className="ThemeGrid">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((styleNum) => (
        <div
          key={styleNum}
          className={`ThemeCard ${
            state.selectedButtonStyle === styleNum ? "active" : ""
          }`}
          onClick={() => updateState("selectedButtonStyle", styleNum)}
        >
          <div className="ThemeCardTitle">Style #{styleNum}</div>
          <div className="ThemeCardPreview">
            <div className={`MockBtn MockBtn-${styleNum}`}>
              {appLang === "EN" ? "Virtual Fitting Room" : "Provador Virtual"}
            </div>
            <div className={`MockBtn MockBtn-${styleNum}`}>
              {appLang === "EN" ? "Size Chart" : "Tabela de Medidas"}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
