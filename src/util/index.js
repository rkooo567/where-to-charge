/*
* utility functions
*
* Functions that are useful for complex calculation.
*
* */

import { getDistance } from 'geolib';

export const getClosestSitesOf = (sites, source) => {
  /*
    get the closest site from the source among a given sites
    @params sites: list of sites object
    @params source: {latitude: number, longitude: number} object
  */

  let closestSite = {};
  let closestDistance = Number.MAX_VALUE;

  sites.forEach(site => {
    // iterate the sites
    const siteCoordinate = {
      latitude: Number(site.location.coordinates[1]),
      longitude: Number(site.location.coordinates[0])
    };

    // get the distance of a site from the source
    const distance = getDistance(source, siteCoordinate);

    // if distance is the closer than the previous closest distance,
    //  change the closest site
    if (distance < closestDistance) {
      closestDistance = distance;
      closestSite = site;
    }
  });

  return closestSite;
};