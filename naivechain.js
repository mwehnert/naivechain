class Block {
    constructor(index, previousHash, timestamp, data, hash) {
      this.index = index;
      this.previousHash = previousHash.toString();
      this.timestamp = timestamp;
      this.data = data;
      this.hash = hash.toString();
    }
  }

class NaiveChainModel {
    constructor () {
        var self = this;

        self.newBlockData = ko.observable();
        self.blocks = ko.observableArray();

        self.loadData();
    }

    loadData() {
        var self = this;

        self.newBlockData(self.makeid());

        $.getJSON("http://localhost:3001/blocks", function (data) {
            self.blocks(data);
        });
    }

    mineBlock() {
        var self = this;
        const data = '{"data": "' + self.newBlockData() + '"}';

        $.ajax({
            url: "http://localhost:3001/mineBlock",
            type: "POST",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: 'json'
            }).always(function (data) {
                self.loadData();
            });
    }

    makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
    }

    addNode() {
        $.ajax({
            url: "http://localhost:3001/addNode",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: 'json'
            }).always(function (data) {
                self.loadData();
            });
    }
}

ko.applyBindings(new NaiveChainModel());
