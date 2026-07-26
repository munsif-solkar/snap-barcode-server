export namespace automation {
	
	export class Config {
	    enableTyping: boolean;
	    pressEnter: boolean;
	    typingDelay: number;
	
	    static createFrom(source: any = {}) {
	        return new Config(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.enableTyping = source["enableTyping"];
	        this.pressEnter = source["pressEnter"];
	        this.typingDelay = source["typingDelay"];
	    }
	}

}

