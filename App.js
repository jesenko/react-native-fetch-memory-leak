import React from 'react';
import { StyleSheet, ScrollView, Text, View, Button } from 'react-native';

export default class App extends React.Component {
  state = {
    fetchCount: 0,
    blobs: [],
    lastRes: null,
    readFromBlob: false,
    allPrevResults: null
  };

  render() {
    const { fetchCount, blobs, lastRes, allPrevResults } = this.state;
    if (allPrevResults) {
      return (
        <View style={styles.container}>
          <Text style={{ fontSize: 30 }}>
            Yay, obtained all previously fetched results!!
          </Text>
          <ScrollView style={{ flex: 1 }}>
            <Text>{allPrevResults}</Text>
          </ScrollView>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Button
          title="Read previously fetched results"
          onPress={() => {
            this.setState({ readFromBlob: true });
            this.readFromBlob();
          }}
        />
        <View>
          <Text style={{ fontSize: 30 }}>
            Executing fetch('https://www.facebook.com') and storing blob info on
            each request...
          </Text>
          <Text>Already fetched #: {fetchCount}</Text>
        </View>
        <ScrollView style={{ flex: 1 }}>
          {blobs.map(blob => <Text key={blob.blobId}>{blob.blobId}</Text>)}
        </ScrollView>
        <ScrollView style={{ flex: 1 }}>
          <Text>{lastRes}</Text>
        </ScrollView>
      </View>
    );
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    return fetch('https://www.facebook.com').then(res => {
      res.text().then(text => {
        this.setState(({ fetchCount, blobs, readFromBlob }) => ({
          fetchCount: fetchCount + 1,
          blobs: [...blobs, { ...res._bodyBlob._data }],
          lastRes: text
        }));
        if (!this.state.readFromBlob) {
          this.fetchData();
        }
      });
    });
  }

  readFromBlob() {
    const { blobs } = this.state;
    blobs.map(b => {
      const reader = new FileReader();
      reader.onload = () => {
        this.setState(({ allPrevResults }) => ({
          allPrevResults: allPrevResults + reader.result
        }));
      };
      reader.readAsText({ data: b });
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
