import AppIntents
import UIKit

@available(iOS 16.0, *)
struct OpenShortcutTemplatesIntent: AppIntent {
    static let title: LocalizedStringResource = "Open Shortcut Templates"
    static var description: IntentDescription? = "Launches the Shortcut Templates screen in Weave Genesis"
    static var openAppWhenRun: Bool = true

    func perform() async -> some IntentResult & ProvidesDialog {
        let url = URL(string: "weavegenesis://ShortcutTemplates")!
        await MainActor.run {
            UIApplication.shared.open(url, options: [:], completionHandler: nil)
        }
        return .result(dialog: "Opening Shortcut Templates…")
    }
}

@available(iOS 16.0, *)
struct AppShortcuts: AppShortcutsProvider {
    @AppShortcutsBuilder
    static var appShortcuts: [AppShortcut] {
        AppShortcut(
            intent: OpenShortcutTemplatesIntent(),
            phrases: [
                "Open \(.applicationName) shortcuts",
                "Show \(.applicationName) templates"
            ]
        )
    }
}
