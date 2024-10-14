package com.superwallreactnative.models

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap

import com.superwall.sdk.models.triggers.Experiment
import com.superwall.sdk.models.assignment.ConfirmedAssignment

fun ConfirmedAssignment.toJson(): ReadableMap {
    val assignmentMap = Arguments.createMap()
    assignmentMap.putString("experimentId", this.experimentId)
    assignmentMap.putMap("variant", this.variant.toJson())
    return assignmentMap
}
