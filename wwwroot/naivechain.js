class Node {
    constructor (parent, index) {
        this.parent = parent;
        this.index = index;
        
        this.newBlockData = ko.observable();
        this.blocks = ko.observableArray();

        this.isLoading = ko.observable(false);
        this.loadingText = ko.observable("");

        this.loadBlocks();
    }

    loadBlocks () {
        var self = this;

        this.newBlockData(this.makeid());
        
        self.isLoading(true);
        self.loadingText("loading blocks ...");

        $.getJSON(`http://localhost:300${this.index}/blocks`, function (data) {
            self.blocks(data);
        }).always(function () {
            self.isLoading(false);
            self.loadingText("");
        });
    }

    makeid () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
    }

    mineBlock () {
        var self = this;
        const data = '{"data": "' + this.newBlockData() + '"}';

        self.isLoading(true);
        self.loadingText("erstelle Block ...");

        $.ajax({
            url: "http://localhost:3001/mineBlock",
            type: "POST",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: 'json'
            }).always(function (data) {
                self.isLoading(false);
                self.loadingText("");

                self.loadBlocks();

                setTimeout(function () {
                    self.parent.nodes().forEach((num, index) => {
                        if (index != self.index - 1) {
                            self.parent.nodes()[index].loadBlocks();
                        }
                    });
                    }, 2000);
            });
    }
}

class Block {
    constructor (parent, index, previousHash, timestamp, data, hash) {
        this.parent = parent;
        this.index = index;
        this.previousHash = previousHash.toString();
        this.timestamp = timestamp;
        this.data = data;
        this.hash = hash.toString();
    }
}

class NaiveChainModel {
    constructor () {

        this.nodes = ko.observableArray();

        this.loadNodes();
    }

    loadNodes () {
        var self = this;

        $.getJSON(`http://localhost:3001/nodes`, function (data) {
            var nodes = data.map(index => new Node(self, index));
            self.nodes(nodes);
        });
    }

    addNode () {
        var self = this;
        var newIndex = this.nodes().length + 1;
        var newNode = new Node(self, newIndex);

        const data = `{"index": "${newIndex}"}`;

        $.ajax({
            url: "http://localhost:3001/addNode",
            type: "POST",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: 'json'
            }).always(function (data) {
                self.nodes.push(newNode);
            });
    }
}

ko.bindingHandlers.trimLengthText = {};
ko.bindingHandlers.trimText = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var trimmedText = ko.computed(function () {
            var untrimmedText = ko.utils.unwrapObservable(valueAccessor());
            var defaultMaxLength = 20;
            var minLength = 5;
            var maxLength = ko.utils.unwrapObservable(allBindingsAccessor().trimTextLength) || defaultMaxLength;
            if (maxLength < minLength) maxLength = minLength;
            var text = untrimmedText.length > maxLength ? untrimmedText.substring(0, maxLength - 1) + '...' : untrimmedText;
            return text;
        });
        ko.applyBindingsToNode(element, {
            text: trimmedText
        }, viewModel);

        return {
            controlsDescendantBindings: true
        };
    }
};

ko.applyBindings(new NaiveChainModel());
