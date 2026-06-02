import React from "react";
import {
    AlertCircle,
    CheckCircle2,
    Loader2,
    FileEdit,
    RefreshCw,
    Check,
    ExternalLink,
    Terminal,
    Blocks,
    Braces,
    X,
    Plus,
    Trash2,
    ChevronDown,
    ChevronRight,
    ChevronsUpDown,
    Flame,
    Trophy,
    Code,
    Play,
    Circle,
    Lock,
    LogOut,
    Calendar,
    LayoutDashboard,
    Map,
    LucideProps
} from "lucide-react";

export interface IconProps extends Omit<LucideProps, "fill"> {
    fill?: boolean;
    spin?: boolean;
}

const wrapIcon = (LucideComponent: React.ComponentType<LucideProps>, defaultSpin = false) => {
    const IconComponent = ({ fill, spin, className = "", ...props }: IconProps) => {
        return (
            <LucideComponent
                className={`${spin || defaultSpin ? "animate-spin" : ""} ${className}`}
                fill={fill ? "currentColor" : "none"}
                {...props}
            />
        );
    };

    IconComponent.displayName = `Icon(${LucideComponent.displayName || LucideComponent.name || "Component"})`;
    return IconComponent;
};

export const Icons = {
    error: wrapIcon(AlertCircle),
    check_circle: wrapIcon(CheckCircle2),
    loading: wrapIcon(Loader2, true),
    edit_note: wrapIcon(FileEdit),
    sync: wrapIcon(RefreshCw, true),
    check: wrapIcon(Check),
    open_in_new: wrapIcon(ExternalLink),
    terminal: wrapIcon(Terminal),
    code_blocks: wrapIcon(Blocks),
    data_object: wrapIcon(Braces),
    close: wrapIcon(X),
    add: wrapIcon(Plus),
    delete: wrapIcon(Trash2),
    expand_more: wrapIcon(ChevronDown),
    chevron_right: wrapIcon(ChevronRight),
    expand_all: wrapIcon(ChevronsUpDown),
    collapse_all: wrapIcon(ChevronsUpDown),
    flag: wrapIcon(Trophy),
    emoji_events: wrapIcon(Trophy),
    local_fire_department: wrapIcon(Flame),
    military_tech: wrapIcon(Trophy),
    code: wrapIcon(Code),
    play_arrow: wrapIcon(Play),
    radio_button_unchecked: wrapIcon(Circle),
    lock: wrapIcon(Lock),
    logout: wrapIcon(LogOut),
    calendar_month: wrapIcon(Calendar),
    dashboard: wrapIcon(LayoutDashboard),
    map: wrapIcon(Map),
};

export type IconName = keyof typeof Icons;

interface DynamicIconProps extends IconProps {
    name: IconName;
}

export const Icon = ({ name, ...props }: DynamicIconProps) => {
    const TargetIcon = Icons[name];
    if (!TargetIcon) return null;
    return <TargetIcon {...props} />;
};