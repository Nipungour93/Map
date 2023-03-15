/**
 * @format
 * Home Screen
 */

import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
  FlatList,
  Platform,
  Alert,
} from 'react-native';
import {
  Marker,
  Region,
  Callout,
  PROVIDER_GOOGLE,
  Circle,
  Polygon,
  Polyline,
  Heatmap,
} from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import {MapZoomPanel} from './../../../component';
import {Images} from './../../../constants';
import {markersData} from './../../mapData';
import {getStyle} from './styles';

function getRandomLatitude(min = 48, max = 56) {
  return Math.random() * (max - min) + min;
}

function getRandomLongitude(min = 14, max = 24) {
  return Math.random() * (max - min) + min;
}

const getPredictions = text => {
  setSearchText(text);
};

const Map = ({item}) => {
  const styles = getStyle();

  const initialMapState = {
    markersData,
    categories: [
      {
        id: 1,
        name: 'FastFood Center',
        icon: (
          <MaterialCommunityIcons
            style={styles.chipIcon}
            name="food-fork-drink"
            size={18}
          />
        ),
        markers: [
          {
            latitude: 20.4827,
            longitude: 78.9529,
          },
          {
            latitude: 20.3737,
            longitude: 78.9429,
          },
        ],
      },
      {
        id: 2,
        name: 'Resturents',
        icon: (
          <MaterialCommunityIcons
            style={styles.chipIcon}
            name="food"
            size={18}
          />
        ),
        markers: [
          {
            latitude: 20.4827,
            longitude: 78.9529,
          },
          {
            latitude: 20.3737,
            longitude: 78.9429,
          },
        ],
      },
      {
        id: 3,
        name: 'Hotel',
        icon: (
          <MaterialCommunityIcons
            style={styles.chipIcon}
            name="food-fork-drink"
            size={18}
          />
        ),
        markers: [
          {
            latitude: 20.4827,
            longitude: 78.9529,
          },
          {
            latitude: 20.3737,
            longitude: 78.9429,
          },
        ],
      },
      {
        id: 4,
        name: 'Drink',
        icon: (
          <MaterialCommunityIcons
            style={styles.chipIcon}
            name="food-fork-drink"
            size={18}
          />
        ),
          markers: [
          {
            latitude: 20.4827,
            longitude: 78.9529,
          },
          {
            latitude: 20.3737,
            longitude: 78.9429,
          },
        ],
      },
    ],
    List: [
      {
        id: 1,
        title: 'Marker',
      },
      {
        id: 2,
        title: 'Cluster Marker',
      },
      {
        id: 3,
        title: 'Polygen',
      },
      {
        id: 4,
        title: 'Poline',
      },
      {
        id: 5,
        title: 'Circle',
      },
      {
        id: 6,
        title: 'Position Change',
      },
      {
        id: 7,
        title: 'Zoom Coordinates',
      },
      {
        id: 8,
        title: 'Heat Map',
      },
    ],
  };

  const [state, setState] = useState(initialMapState);
  const [searchText, setSearchText] = useState('');
  const [activeList, setActiveList] = useState(1);
  const [activeCategory, setActiveCategory] = useState(1);
  const [zoom, setZoom] = useState(18);
  const [activeTab, setActiveTab] = useState(1);
  const [markers, setMarkers] = useState([
    {
      id: 0,
      title: 'test',
      latitude: 20.5937,
      longitude: 78.9629,
    },
  ]);
  const region = {
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };
  const map = React.useRef(null);
  const _scrollView = React.useRef(null);

  const generateMarkers = React.useCallback((lat, long) => {
    const markersArray = [];

    for (let i = 0; i < 10; i++) {
      markersArray.push({
        id: i,
        title: 'test',
        latitude: getRandomLatitude(lat - 0.05, lat + 0.05),
        longitude: getRandomLongitude(long - 0.05, long + 0.05),
        description: 'desc',
      });
    }
    setMarkers(markersArray);
  }, []);

  useEffect(() => {
    generateMarkers(region.latitude, region.longitude);
  }, []);

  useEffect(() => {
    if (activeList == 7) {
      map?.current?.fitToCoordinates(markers, {
        edgePadding: {
          bottom: 200,
          right: 50,
          top: 150,
          left: 50,
        },
        animated: true,
      });
    }
  }, [activeList]);

  const getRegionForZoom = (lat, lon, zoom) => {
    const distanceDelta = Math.exp(Math.log(360) - zoom * Math.LN2);
    const {width, height} = Dimensions.get('window');
    const aspectRatio = width / height;
    return {
      latitude: lat,
      longitude: lon,
      latitudeDelta: distanceDelta * aspectRatio,
      longitudeDelta: distanceDelta,
    };
  };

  const mapZoomIn = () => {
    if (zoom > 18) {
      console.log('mapZoomIn');
      setZoom(18);
    } else {
      setZoom(zoom + 1);
      console.log('mapZoomIns');
      const regn = getRegionForZoom(
        region.latitude,
        region.longitude,
        zoom + 1,
      );
      map.current.animateToRegion(regn, 200);
    }
  };

  const mapZoomOut = () => {
    if (zoom < 3) {
      setZoom(3);
      console.log('mapZoomOut');
    } else {
      setZoom(zoom - 1);
      console.log('mapZoomOuts');
      const regn = getRegionForZoom(
        region.latitude,
        region.longitude,
        zoom - 1,
      );
      map.current.animateToRegion(regn, 200);
    }
  };

  const categoryItems = () => {};

  const renderMarker = () => {
    if (activeList == 1 || activeList == 2) {
      return markers.map(item => (
        <Marker
          draggable={true}
          key={item.id}
          pinColor="blue"
          onDragEnd={e => console.log({x: e.nativeEvent.coordinate})}
          coordinate={{
            latitude: item.latitude,
            longitude: item.longitude,
          }}>
          <Callout tooltip>
            <View style={{width: 'auto'}}>
              <View style={styles.bubble}>
                <Text style={styles.description}>{'This is your place'}</Text>
                <Text style={styles.name}>Lat:{item.latitude}</Text>
                <Text style={styles.name}>Long:{item.longitude}</Text>
                {/* <Text style={styles.description}>{'This is your place'}</Text> */}
                {/* <Image style={styles.imageMap} source={Images.carBanner} /> */}
                <TouchableOpacity>
                  <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>{'Submit'}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.arrowBorder} />
            <View style={styles.arrow} />
          </Callout>
        </Marker>
      ));
    }
  };

  const onPressCategory = (e) =>{
    map?.current?.fitToSuppliedMarkers(ḛ.markersData, true);
  }

  return (
    <View style={styles.container}>
      <MapView
        clusteringEnabled={activeList == 2}
        ref={map}
        mapType="standard"
        style={styles.map}
        initialRegion={region}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        zoomTapEnabled={true}
        zoomEnabled={true}
        showsMyLocationButton={true}
        showsScale={true}
        followsUserLocation={true}
        onPress={({nativeEvent: {coordinate}}) => {
          const zoomMarker = [
            {
              latitude: coordinate?.latitude,
              longitude: coordinate?.longitude,
            },
          ];
          map?.current?.fitToSuppliedMarkers(zoomMarker, true);
          // setMarkers([
          //   ...markers,
          //   {
          //     latitude: coordinate?.latitude,
          //     longitude: coordinate?.longitude,
          //   },
          // ])
        }}>
        {renderMarker()}

        {activeList == 4 && (
          <Polyline
            coordinates={markersData}
            fillColor="rgba(0, 200, 0, 0.5)"
            strokeColor="rgba(0,0,0,0.5)"
            strokeWidth={2}
          />
        )}
        {activeList == 3 && (
          <Polygon
            coordinates={markersData}
            fillColor="rgba(0, 200, 0, 0.5)"
            strokeColor="rgba(0,0,0,0.5)"
            strokeWidth={2}
          />
        )}

        {activeList == 5 &&
          markersData.map(item => (
            <Circle
              center={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              radius={750}
              fillColor={'#A3BE80'}
              lineCap={'butt'}
            />
          ))}
        {activeList == 8 && state.markersData.length !== 0 && (
          <Heatmap
            points={state.markersData}
            opacity={1}
            radius={50}
            maxIntensity={100}
            gradientSmoothing={10}
            heatmapMode={'POINTS_DENSITY'}
          />
        )}
      </MapView>

      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          value={searchText}
          onChangeText={getPredictions}
          style={{flex: 1, padding: 0}}
        />
        <Ionicons name="search" size={22} />
      </View>
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.chipScrollView}
        contentContainerStyle={{
          paddingRight: Platform.OS === 'android' ? 10 : 0,
        }}>
        {state.categories.map((category, index) => (
          <Pressable
            key={index}
            onPress={() => setActiveCategory(category.id)}
            style={[
              styles.chipItem,
              activeCategory == category.id && styles.activeTabContainer,
            ]}>
            {category.icon}
            <Text
              style={[
                styles.chipListContent,
                activeCategory == category.id && styles.activeTabTitle,
              ]}>
              {category.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <FlatList
        horizontal={true}
        data={state.List}
        keyExtractor={item => item.id}
        style={styles.chipListScrollView}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.chipListItem,
              activeList == item.id && styles.activeTabContainer,
            ]}
            onPress={() => setActiveList(item.id)}>
            <Text
              style={[
                styles.chipListContent,
                activeList == item.id && styles.activeTabTitle,
              ]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />

      <MapZoomPanel
        onZoomIn={() => {
          mapZoomIn();
        }}
        onZoomOut={() => {
          mapZoomOut();
        }}
      />
    </View>
  );
};

export {Map};
