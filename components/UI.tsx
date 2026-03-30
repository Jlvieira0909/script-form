import { ReactNode } from "react";

export const Tooltip = ({ text }: { text?: string }) => {
  if (!text) return null;
  return (
    <div className="TooltipContainer">
      <span className="TooltipIcon" onClick={(e) => e.preventDefault()}>
        ?
      </span>
      <div className="TooltipText">{text}</div>
    </div>
  );
};

export const TextInput = ({
  title,
  placeholder,
  tooltip,
  value,
  onChange,
}: any) => (
  <div className="MainFormTextInput">
    <div className="TitleWrapper">
      <h1 className="MainFormTextInputTitle">{title}</h1>
      <Tooltip text={tooltip} />
    </div>
    <input
      className="MainFormTextInputInput"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export const SelectInput = ({
  title,
  tooltip,
  value,
  onChange,
  options,
}: any) => (
  <div className="MainFormTextInput">
    <div className="TitleWrapper">
      <h1 className="MainFormTextInputTitle">{title}</h1>
      <Tooltip text={tooltip} />
    </div>
    <div className="CustomSelectContainer" style={{ width: "100%" }}>
      <select
        className="MainFormSelectInput"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export const ToggleBlock = ({
  title,
  checked,
  onChange,
  tooltip,
  children,
  reverseColors,
}: any) => (
  <div className="MainFormToggleInput">
    <label className="MainFormToggleInputToggle">
      <div className="TitleWrapper">
        <h1 className="MainFormTextInputTitle">{title}</h1>
        <Tooltip text={tooltip} />
      </div>
      <input
        type="checkbox"
        className={`toggle-input ${reverseColors ? "reverse" : ""}`}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
    {children}
  </div>
);

export const SwitcherOptions = ({
  title,
  leftOption,
  rightOption,
  isRight,
  onChange,
  tooltip,
}: any) => (
  <div className="MainFormToggleInput">
    <div
      className="MainFormToggleInputToggle"
      style={{ justifyContent: "flex-start", gap: "20px" }}
    >
      <div className="TitleWrapper">
        <h1 className="MainFormTextInputTitle">{title}</h1>
        <Tooltip text={tooltip} />
      </div>
      <div className="SwitcherLabels">
        <span className={`SwitcherLabel ${!isRight ? "active" : ""}`}>
          {leftOption}
        </span>
        <label className="SwitcherLabelToggle">
          <input
            type="checkbox"
            className="toggle-input"
            checked={isRight}
            onChange={(e) => onChange(e.target.checked)}
          />
        </label>
        <span className={`SwitcherLabel ${isRight ? "active" : ""}`}>
          {rightOption}
        </span>
      </div>
    </div>
  </div>
);

export const Modal = ({
  isOpen,
  onClose,
  title,
  tabs,
  activeTab,
  onTabChange,
  content,
  onCopy,
  isCopied,
  copyText,
}: any) => {
  if (!isOpen) return null;
  return (
    <div className="ModalOverlay" onClick={onClose}>
      <div className="ModalContent" onClick={(e) => e.stopPropagation()}>
        <div className="ModalHeader">
          <h2 className="ModalTitle">{title}</h2>
          <button className="ModalClose" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="ModalTabs">
          {tabs.map((tab: any) => (
            <button
              key={tab.id}
              className={`ModalTab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <pre className="ModalBody">
          <code>{content}</code>
        </pre>
        <div
          className="MainActions"
          style={{ justifyContent: "flex-end", marginTop: 0 }}
        >
          <button
            className={`MainActionsButton primary ${isCopied ? "copied" : ""}`}
            onClick={onCopy}
            style={{ maxWidth: "200px" }}
          >
            {copyText}
          </button>
        </div>
      </div>
    </div>
  );
};
