type Settings = {
    airplaneMode: boolean
    streamerMode: boolean
    doNotDisturb: boolean
    locale: string

    name: string
    avatar?: string
    address?: string
    email?: string

    display: {
        brightness: number
        size: number
        theme: 'dark' | 'light'
        automatic: boolean
        frameColor?: string
    }
    security: {
        pinCode: boolean
        faceId: boolean
    }
    wallpaper: {
        background: string
        blur?: boolean
    }
    time: {
        twelveHourClock: boolean
    }
    sound: {
        volume: number
        ringtone: string
        texttone: string
        silent: boolean
    }
    weather: {
        celcius: boolean
    }
    storage: {
        used: number
        total: number
    }
    phone: {
        showCallerId: boolean
    }
    notifications?: {
        [key: string]: {
            enabled: boolean
            sound: boolean
        }
    }
    lockscreen: {
        color: string
        fontStyle: number
        layout: number
    }
    apps: string[][]

    version?: string
    latestVersion?: string
}

declare global {
    var components: {
        setHomeIndicatorVisible: (visible: boolean) => void
    }
    var fetchNui: <T>(eventName: string, data?: unknown, mockData?: T) => Promise<T>
    var useNuiEvent: <T>(eventName: string, cb: (data: T) => void) => void
    var onSettingsChange: (cb: (settings: Settings) => void) => void
    var settings: Settings
    var appName: string
    var resourceName: string

    type setPopUp = {
        title: string; // Title of the popup (mandatory)
        description?: string; // Optional description
        vertical?: boolean; // Whether buttons should be arranged vertically

        // Array of buttons with properties for their behavior and appearance
        buttons: {
            title: string; // Button text/title
            cb?: () => void; // Callback function on button click
            disabled?: boolean; // Disable the button
            bold?: boolean; // Bold font style for emphasis

            color?: "red" | "blue"; // Styling options for buttons
        }[];
    };
}

export {}
