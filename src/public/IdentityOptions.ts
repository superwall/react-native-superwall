/// Options passed in when calling `Superwall.identify(userId:options:)`.
export class IdentityOptions {
  // Determines whether the SDK should wait to restore paywall assignments from the server
  // before presenting any paywalls.
  //
  // This should only be used in advanced use cases. By setting this to `true`, it prevents
  // paywalls from showing until after paywall assignments have been restored. If you expect
  // users of your app to switch accounts or delete/reinstall a lot, you'd set this when users log
  // in to an existing account.
  restorePaywallAssignments: boolean;

  // Constructor for IdentityOptions.
  //
  // [restorePaywallAssignments]: If set to `true`, it waits for paywall assignments to be restored
  // before showing any paywalls. Defaults to `false`.
  constructor(restorePaywallAssignments: boolean = false) {
    this.restorePaywallAssignments = restorePaywallAssignments;
  }

  // Serializes the instance to a JSON object.
  toJson(): object {
    return {
      restorePaywallAssignments: this.restorePaywallAssignments,
    };
  }
}
