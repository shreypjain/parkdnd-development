//
//  GMapViewController.swift
//  ParkDND
//
//  Created by Shrey Jain on 7/12/20.
//  Copyright © 2020 Shrey Jain. All rights reserved.
//

import UIKit
import GoogleMaps

class GMapViewController: UIViewController {
    let KEY = "AIzaSyDFeL1SysM-kXcgsF4BIpgsE4fIbGvnrUQ"

    override func viewDidLoad() {
        super.viewDidLoad()
        GMSServices.provideAPIKey(KEY)
        // Do any additional setup after loading the view.
        // Create a GMSCameraPosition that tells the map to display the
        // coordinate -33.86,151.20 at zoom level 6.
        let camera = GMSCameraPosition.camera(withLatitude: 40.456420, longitude: -74.493510, zoom: 15.0)
        let mapView = GMSMapView.map(withFrame: self.view.frame, camera: camera)
        self.view.addSubview(mapView)

        // Creates a marker in the center of the map.
        let marker = GMSMarker()
        marker.position = CLLocationCoordinate2D(latitude: 40.456420, longitude: -74.493510)
        marker.title = "North Brunswick"
        marker.snippet = "New Jersey"
        marker.map = mapView

    }


}

