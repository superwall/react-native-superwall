#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE (SuperwallReactNative, NSObject)

RCT_EXTERN_METHOD(
    configure : (NSString *)apiKey options : (NSDictionary *)options
        usingPurchaseController : (BOOL)usingPurchaseController sdkVersion : (
            NSString *)sdkVersion withResolver : (RCTPromiseResolveBlock)
            resolve withRejecter : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(register : (NSString *)event params : (NSDictionary *)
                      params handlerId : (NSString *)handlerId withResolver : (
                          RCTPromiseResolveBlock)
                          resolve withRejecter : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(identify : (NSString *)userId options : (NSDictionary *)
                      options)

RCT_EXTERN_METHOD(reset)

RCT_EXTERN_METHOD(setDelegate : (BOOL)isUndefined)

RCT_EXTERN_METHOD(getConfigurationStatus : (RCTPromiseResolveBlock)
                      resolve withRejecter : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getEntitlements : (RCTPromiseResolveBlock)
                      resolve withRejecter : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setLogLevel : (NSString *)level)

RCT_EXTERN_METHOD(setSubscriptionStatus : (NSDictionary)status)

RCT_EXTERN_METHOD(getSubscriptionStatus : (RCTPromiseResolveBlock)
                      resolve withRejecter : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setInterfaceStyle : (NSString *)style)

RCT_EXTERN_METHOD(getUserAttributes : (RCTPromiseResolveBlock)
                      resolve withRejecter : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setUserAttributes : (NSDictionary)userAttributes)

RCT_EXTERN_METHOD(handleDeepLink : (NSString *)url withResolver : (
    RCTPromiseResolveBlock)resolve withRejecter : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(didPurchase : (NSDictionary *)result)

RCT_EXTERN_METHOD(didRestore : (NSDictionary *)result)

RCT_EXTERN_METHOD(dismiss : (RCTPromiseResolveBlock)
                      resolve withRejecter : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getAssignments : (RCTPromiseResolveBlock)
                      resolve withRejecter : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(confirmAllAssignments : (RCTPromiseResolveBlock)
                      resolve withRejecter : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(observeSubscriptionStatus : (RCTPromiseResolveBlock)
                      resolve withRejecter : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getPresentationResult : (NSString *)event params : (
    NSDictionary *)options withResolver : (RCTPromiseResolveBlock)
                      resolve withRejecter : (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(preloadAllPaywalls)

RCT_EXTERN_METHOD(preloadPaywalls : (NSArray<NSString *> *)eventNames)

+ (BOOL)requiresMainQueueSetup {
  return NO;
}

@end
