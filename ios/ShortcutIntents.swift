// ShortcutIntents.swift
import AppIntents
import UIKit

@available(iOS 16.0, *)
struct Thread: AppEntity, Identifiable {
    let id: String
    let title: String

    static var typeDisplayRepresentation = TypeDisplayRepresentation(name: LocalizedStringResource("Thread"))
    var displayRepresentation: DisplayRepresentation {
        .init(title: LocalizedStringResource(stringLiteral: title))
    }

    static var defaultQuery = ThreadQuery()
}

@available(iOS 16.0, *)
struct ThreadQuery: EntityQuery {
    func entities(for identifiers: [Thread.ID]) async throws -> [Thread] {
        // TODO: Replace with your real data fetch
        return [
            Thread(id: "1", title: "SOS Thread"),
            Thread(id: "2", title: "All Hands on Meeting"),
        ].filter { identifiers.contains($0.id) }
    }
    
    func suggestedEntities() async throws -> [Thread] {
        // TODO: Replace with your real data fetch
        return [
            Thread(id: "1", title: "SOS Thread"),
            Thread(id: "2", title: "All Hands on Meeting"),
        ]
    }
}

@available(iOS 16.0, *)
struct TriggerThreadIntent: AppIntent {
    static var title: LocalizedStringResource = LocalizedStringResource("Trigger Thread")
    static var description = IntentDescription("Trigger a thread in Weave.")
    static var openAppWhenRun: Bool = true

    @Parameter(title: LocalizedStringResource("Thread"))
    var thread: Thread

    func perform() async throws -> some IntentResult & ProvidesDialog {
        // 1) Fire the webhook to trigger the thread
        let tenant = "drewgonzales2021%40gmail.com"
        let webhookURL = URL(string:
            "https://api.weave.cloud/api/webhooks/workflow/" +
            "66a7db5f604cf798bd09de69" +
            "?X-Tenant-ID=\(tenant)&thread_id=\(thread.id)"
        )!
        _ = try await URLSession.shared.data(from: webhookURL)

        // Since openAppWhenRun is true, the app will open automatically
        // Your React Native app should handle the deep link via URL schemes
        
        return .result(dialog: IntentDialog("Triggering \(thread.title)…"))
    }
}
