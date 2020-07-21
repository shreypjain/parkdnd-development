//
//  HostView.swift
//  ParkDNDSwiftUI
//
//  Created by Neloy Kundu on 7/21/20.
//  Copyright © 2020 Neloy Kundu. All rights reserved.
//

import SwiftUI

struct HostView: View {
    let currentScreen : String
    let currentUserDetails : UserDetails
    var body: some View {
        VStack {
            Spacer()
            Text("Name: \(currentUserDetails.username)")
            Spacer()
            Text("Location: \(currentUserDetails.location)")
            Spacer()
            Text("Spots: \(currentUserDetails.currentSpots)")
            Spacer()
        }
    }
}
