package com.superwallreactnative.models

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.superwall.sdk.models.triggers.Experiment


fun Experiment.Variant.toJson(): ReadableMap {
    val variantMap = Arguments.createMap()
    variantMap.putString("id", this.id)
    variantMap.putString("type", this.type.toString())
    variantMap.putString("paywallId", this.paywallId)

    return variantMap
}
